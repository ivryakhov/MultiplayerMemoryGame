using Akka.Actor;
using System.Collections.Generic;
using ActorModel.Messages;
using System.Linq;
using GameModel;

namespace ActorModel.Actors
{
    public class GameControllerActor : ReceiveActor
    {
        private const int _maxPlayersNUmber = 4;
        private const int _enoughPlayersNumberToStart = 2;
        private CircularList<Player> _players;
        private Player _activePlayer;
        private Board _board;        

        public GameControllerActor()
        {
            _players = new CircularList<Player>();
            _board = new Board();

            Receive<JoinGameMessage>(message => JoinGame(message));
            Receive<ReturnToGameMessage>(message => ReturnToGame(message));
            Receive<LeaveGameMessage>(message => LeaveGame(message));
            Receive<RequestPlayersListMessage>(message => GetPlayersList(message));
            Receive<RequestBoardStateMessage>(message => RequestBoardState(message));
            Receive<ProcessCardClickMessage>(message => ProcessCardClick(message));
            Receive<RequestNewGame>(message => startGame());
        }       

        private void JoinGame(JoinGameMessage message)
        {            
            if (string.IsNullOrEmpty(message.PlayerName))
            {
                Sender.Tell(new PlayerLoginFailed("The name should not be empty", message.ConnectionId));
            }
            else if (isPlayerExists(message.PlayerName))
            {
                Sender.Tell(new PlayerLoginFailed("Player with this name is already joined", message.ConnectionId));
            }
            else if (_players.Count >= _maxPlayersNUmber)
            {
                Sender.Tell(new PlayerLoginFailed($"Number of players is not allowed to be more than {_maxPlayersNUmber}",
                    message.ConnectionId));
            }
            else
            {
                var newPlayer = new Player(message.PlayerName);
                _players.Add(newPlayer);

                Sender.Tell(new PlayerJoinedMessage(newPlayer));
                Sender.Tell(new PlayerLoginSuccess(message.PlayerName, message.ConnectionId));
                Sender.Tell(new LogMessage($"{newPlayer.Name} has joined to the game"));
            }
            if (_players.Count >= _enoughPlayersNumberToStart && _board.State == Board.GameState.WaitingForPlayers)
            {
                startGame();
            }
        }

        private void ReturnToGame(ReturnToGameMessage message)
        {
            if (isPlayerExists(message.PlayerName))
            {
                Sender.Tell(new PlayerLoginSuccess(message.PlayerName, message.ConnectionId));
            }
            else
            {
                Sender.Tell(new PlayerLogoutSuccess(message.PlayerName, message.ConnectionId));
            }
        }

        private void LeaveGame(LeaveGameMessage message)
        {
            if (isPlayerExists(message.PlayerName))
            {
                var playerToDelete = _players.First(p => p.Name == message.PlayerName);
                _players.Remove(playerToDelete);
                Sender.Tell(new PlayerLogoutSuccess(message.PlayerName, message.ConnectionId));
                Sender.Tell(new PlayerLeavedMessage(message.PlayerName));
                Sender.Tell(new LogMessage($"{message.PlayerName} has left the game"));
            }
        }

        private void GetPlayersList(RequestPlayersListMessage message)
        {
            Sender.Tell(new PlayersListProvidedMessage(_players, message.ConnectionId));
        }

        private void RequestBoardState(RequestBoardStateMessage message)
        {
            Sender.Tell(new BoardStateProvidedMessage(_board, message.ConnectionId));
        }

        private void ProcessCardClick(ProcessCardClickMessage message)
        {
            if (_board.State == Board.GameState.GameStarted && _activePlayer.Name == message.PlayerName)
            {
                var (isUpdateScoreRequired, isNeededToTurnTransfer) = _board.ProcessCardClick(message.Index);
                if (isNeededToTurnTransfer)
                {
                    transferTurn();
                }

                if (isUpdateScoreRequired)
                {
                    _activePlayer.Score++;
                    Sender.Tell(new BroadcastPlayersListMessage(_players));
                }
                Sender.Tell(new BroadcastBoardStateMessage(_board));

                if (_board.State == Board.GameState.GameFinished)
                {
                    var maxScore = _players.Select(p => p.Score).Max();
                    var winners = _players.Where(p => p.Score == maxScore).ToList();
                    Sender.Tell(new BroadcastWinnersMessage(winners));
                }
            }
        }

        private bool isPlayerExists(string name)
        {
            return _players.FirstOrDefault(p => p.Name == name) != null;
        }

        private void startGame()
        {            
            _board.StartGame();
            Sender.Tell(new BroadcastBoardStateMessage(_board));
            Sender.Tell(new LogMessage("Game is starting"));
            transferTurn();
        }

        private void transferTurn()
        {
            _activePlayer = _players.GetNext();
            Sender.Tell(new NewActivePlayerMessage(_activePlayer));            
        }
    }
}

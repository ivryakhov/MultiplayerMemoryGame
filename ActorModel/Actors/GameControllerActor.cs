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
        private Board _board;
        private GameState _gameState = GameState.WhaitingPlayers;

        public GameControllerActor()
        {
           // _players = new Dictionary<string, IActorRef>();
           
            _players = new CircularList<Player>();
            _board = new Board();

            Receive<JoinGameMessage>(message => JoinGame(message));
            Receive<ReturnToGameMessage>(message => ReturnToGame(message));
            Receive<LeaveGameMessage>(message => LeaveGame(message));
            Receive<RequestPlayersListMessage>(message => GetPlayersList(message));
            Receive<RequestBoardStateMessage>(message => RequestBoardState(message));
            Receive<ProcessCardClickMessage>(message => ProcessCardClick(message));
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
            if (_players.Count >= _enoughPlayersNumberToStart)
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
            _board.ProcessCardClick(message.Index);
            Sender.Tell(new BroadcastBoardStateMessage(_board));
        }

        private bool isPlayerExists(string name)
        {
            return _players.FirstOrDefault(p => p.Name == name) != null;
        }

        private void startGame()
        {

        }
    }
}

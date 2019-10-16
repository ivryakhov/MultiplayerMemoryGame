using Akka.Actor;
using System.Collections.Generic;
using ActorModel.Messages;
using System.Linq;
using GameModel;

namespace ActorModel.Actors
{
    public class GameControllerActor : ReceiveActor
    {
        private CircularList<(string, IActorRef)> _players;
        private Board _board;

        public GameControllerActor()
        {
           // _players = new Dictionary<string, IActorRef>();
           
            _players = new CircularList<(string, IActorRef)>();
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
            else
            {
                IActorRef newPlayerActor =
                    Context.ActorOf(
                        Props.Create(() => new PlayerActor(message.PlayerName, message.ConnectionId)), message.PlayerName);

                _players.Add((message.PlayerName, newPlayerActor));

                Sender.Tell(new PlayerJoinedMessage(message.PlayerName));
                Sender.Tell(new PlayerLoginSuccess(message.PlayerName, message.ConnectionId));
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
                var playerToDelete = _players.First(p => p.Item1 == message.PlayerName);
                _players.Remove(playerToDelete);
                Sender.Tell(new PlayerLogoutSuccess(message.PlayerName, message.ConnectionId));
                Sender.Tell(new PlayerLeavedMessage(message.PlayerName));
            }
        }

        private void GetPlayersList(RequestPlayersListMessage message)
        {
            var players = _players.Select(p => p.Item1).ToList();
            Sender.Tell(new PlayersListProvidedMessage(players, message.ConnectionId));
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
            return _players.FirstOrDefault(p => p.Item1 == name) != (null, null);
        }
    }
}

using Akka.Actor;
using System.Collections.Generic;
using ActorModel.Messages;
using System.Linq;
using GameModel;

namespace ActorModel.Actors
{
    public class GameControllerActor : ReceiveActor
    {
        private readonly Dictionary<string, IActorRef> _players;
        private Board _board;

        public GameControllerActor()
        {
            _players = new Dictionary<string, IActorRef>();
            _board = new Board();

            Receive<JoinGameMessage>(message => JoinGame(message));
            Receive<RequestPlayersListMessage>(message => GetPlayersList(message));
            Receive<RequestBoardStateMessage>(message => RequestBoardState(message));
        }

        private void JoinGame(JoinGameMessage message)
        {
            if (System.String.IsNullOrEmpty(message.PlayerName))
            {
                Sender.Tell(new PlayerLoginFailed("The name should not be empty", message.ConnectionId));
            }
            else if (_players.Keys.Contains(message.PlayerName))
            {
                Sender.Tell(new PlayerLoginFailed("Player with this name is already joined", message.ConnectionId));
            }
            else
            {
                IActorRef newPlayerActor =
                    Context.ActorOf(
                        Props.Create(() => new PlayerActor(message.PlayerName)), message.PlayerName);

                _players.Add(message.PlayerName, newPlayerActor);

                Sender.Tell(new PlayerJoinedMessage(message.PlayerName));
                Sender.Tell(new PlayerLoginSuccess(message.PlayerName, message.ConnectionId));
            }
        }

        private void GetPlayersList(RequestPlayersListMessage message)
        {
            var players = _players.Keys.ToList();
            Sender.Tell(new PlayersListProvidedMessage(players, message.ConnectionId));
        }

        private void RequestBoardState(RequestBoardStateMessage message)
        {
            Sender.Tell(new BoardStateProvidedMessage(_board, message.ConnectionId));
        }
    }
}

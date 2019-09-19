using Akka.Actor;
using System.Collections.Generic;
using ActorModel.Messages;
using System.Linq;

namespace ActorModel.Actors
{
    public class GameControllerActor : ReceiveActor
    {
        private readonly Dictionary<string, IActorRef> _players;

        public GameControllerActor()
        {
            _players = new Dictionary<string, IActorRef>();

            Receive<JoinGameMessage>(message => JoinGame(message));
            Receive<RequestPlayersListMessage>((message) => GetPlayersList(message));
        }

        private void JoinGame(JoinGameMessage message)
        {
            if (_players.Keys.Contains(message.PlayerName))
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
    }
}

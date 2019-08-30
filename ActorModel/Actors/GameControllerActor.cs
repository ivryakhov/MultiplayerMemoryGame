using Akka.Actor;
using System.Collections.Generic;
using ActorModel.Messages;

namespace ActorModel.Actors
{
    public class GameControllerActor : ReceiveActor
    {
        private readonly Dictionary<string, IActorRef> _players;

        public GameControllerActor()
        {
            _players = new Dictionary<string, IActorRef>();

            Receive<JoinGameMessage>(message => JoinGame(message));
        }

        private void JoinGame(JoinGameMessage message)
        {
            IActorRef newPlayerActor =
                Context.ActorOf(
                    Props.Create(() => new PlayerActor(message.PlayerName)), message.PlayerName);

            _players.Add(message.PlayerName, newPlayerActor);

            Sender.Tell(new PlayerJoinedMessage(message.PlayerName));
        }
    }
}

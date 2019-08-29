using ActorModel.Actors;
using ActorModel.Messages;
using Akka.Actor;

namespace ActorModel.Actors.ActorInstances
{
    public class GameControllerActorInstance : IGameControllerActorInstance
    {
        private IActorRef _actor;

        public GameControllerActorInstance(ActorSystem actorSystem)
        {
            _actor = actorSystem.ActorOf(Props.Create<GameControllerActor>());
        }

        public void Tell(IActorMessage message) => _actor.Tell(message);
    }
}

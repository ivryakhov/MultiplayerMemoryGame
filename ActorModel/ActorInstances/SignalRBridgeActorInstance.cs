using ActorModel.ExternalSystems;
using ActorModel.Messages;
using Akka.Actor;

namespace ActorModel.Actors.ActorInstances
{
    public class SignalRBridgeActorInstance : ISignalRBridgeActorInstance
    {
        private readonly IActorRef _actor;

        public SignalRBridgeActorInstance(ActorSystem actorSystem, IGameEventsPusher gameEventPusher, IGameControllerActorInstance gameControllerActorInstance)
        {
            _actor = actorSystem.ActorOf(Props.Create(() => 
                new SignalRBridgeActor(gameEventPusher, gameControllerActorInstance)));
        }

        public void Tell(IActorMessage message) => _actor.Tell(message);
    }
}

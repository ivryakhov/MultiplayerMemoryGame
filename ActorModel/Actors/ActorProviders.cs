using Akka.Actor;

namespace ActorModel.Actors
{
    public delegate IActorRef GameControllerActorProvider();
    public delegate IActorRef SignalRBridgeActorProvider();
}

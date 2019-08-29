using ActorModel.Messages;

namespace ActorModel.Actors.ActorInstances
{
    public interface ISignalRBridgeActorInstance
    {
        void Tell(IActorMessage message);
    }
}

using ActorModel.Messages;

namespace ActorModel.Actors.ActorInstances
{
    public interface IGameControllerActorInstance
    {
        void Tell(IActorMessage message);
    }
}

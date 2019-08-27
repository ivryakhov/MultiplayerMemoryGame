using Akka.Actor;
using ActorModel.Messages;
using ActorModel.ExternalSystems;

namespace ActorModel.Actors
{
    public class SignalRBridgeActor : ReceiveActor
    {
        private readonly IGameEventsPusher _gameEventPusher;
        private readonly IActorRef _gameController;

        public SignalRBridgeActor(IGameEventsPusher gameEventPusher, GameControllerActorProvider gameControllerActorProvider)
        {
            _gameEventPusher = gameEventPusher;
            _gameController = gameControllerActorProvider();


            Receive<JoinGameMessage>(
                message =>
                {
                    _gameController.Tell(message);
                });

            Receive<PlayerStatusMessage>(
                message =>
                {
                    _gameEventPusher.PlayerJoined(message.PlayerName);
                });
        }
    }
}

using Akka.Actor;
using ActorModel.Messages;
using ActorModel.ExternalSystems;
using ActorModel.Actors.ActorInstances;

namespace ActorModel.Actors
{
    public class SignalRBridgeActor : ReceiveActor
    {
        private readonly IGameEventsPusher _gameEventPusher;
        private readonly IGameControllerActorInstance _gameController;

        public SignalRBridgeActor(IGameEventsPusher gameEventPusher,
                                  IGameControllerActorInstance gameControllerActorInstance)
        {
            _gameEventPusher = gameEventPusher;
            _gameController = gameControllerActorInstance;


            Receive<IActorMessage>(
                message =>
                {
                    _gameController.Tell(message);
                });

                      
            Receive<PlayerJoinedMessage>(
                message =>
                {
                    _gameEventPusher.PlayerJoined(message.PlayerName);
                });

            Receive<PlayerLoginSuccess>(
                message =>
                {
                    _gameEventPusher.PlayerLoginSuccess(message.PlayerName, message.ConnectionId);
                });

            Receive<PlayerLeavedMessage>(
                message =>
                {
                    _gameEventPusher.PlayerLeaved(message.PlayerName);
                });

            Receive<PlayerLogoutSuccess>(
                message =>
                {
                    _gameEventPusher.PlayerLogoutSuccess(message.PlayerName, message.ConnectionId);
                });

            Receive<PlayerLoginFailed>(
                message =>
                {
                    _gameEventPusher.PlayerLoginFailed(message.ErrorMessage, message.ConnectionId);
                });            

            Receive<PlayersListProvidedMessage>(
                message =>
                {
                    _gameEventPusher.PlayersListProvided(message.PlayersList, message.ConnectionId);
                });

            Receive<BoardStateProvidedMessage>(
                message =>
                {
                    _gameEventPusher.BoardStateProvided(message.Board, message.ConnectionId);
                });                        

            Receive<BroadcastBoardStateMessage>(
                message =>
                {
                    _gameEventPusher.BroadcastBoardState(message.Board);
                });
        }
    }
}

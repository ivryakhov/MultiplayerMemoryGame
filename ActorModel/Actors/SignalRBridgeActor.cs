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


            Receive<JoinGameMessage>(
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
                }
            );
            Receive<PlayerLoginFailed>(
                message =>
                {
                    _gameEventPusher.PlayerLoginFailed(message.ErrorMessage, message.ConnectionId);
                }
            );
            Receive<RequestPlayersListMessage>(
                message =>
                {
                    _gameController.Tell(message);
                }
            );
            Receive<PlayersListProvidedMessage>(
                message =>
                {
                    _gameEventPusher.PlayersListProvided(message.PlayersList, message.ConnectionId);
                }
            );
            Receive<RequestBoardStateMessage>(
                message =>
                {
                    _gameController.Tell(message);
                }
            );
            Receive<BoardStateProvidedMessage>(
                message =>
                {
                    _gameEventPusher.BoardStateProvided(message.Board, message.ConnectionId);
                }
            );
            Receive<ProcessCardClickMessage>(
                message =>
                {
                    _gameController.Tell(message);
                }
            );
            Receive<BroadcastBoardStateMessage>(
                message =>
                {
                    _gameEventPusher.BroadcastBoardState(message.Board);
                }
            );
        }
    }
}

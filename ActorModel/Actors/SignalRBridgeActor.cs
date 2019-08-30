﻿using Akka.Actor;
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

            Receive<PlayerStatusMessage>(
                message =>
                {
                    _gameEventPusher.PlayerJoined(message.PlayerName);
                });
        }
    }
}

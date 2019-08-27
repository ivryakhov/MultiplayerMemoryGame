using ActorModel.Actors;
using ActorModel.Messages;
using Akka.Actor;
using Microsoft.AspNetCore.SignalR;

namespace MultiplayerMemoryGame.Models
{
    public class GameHub : Hub
    {
        private readonly IActorRef _signalRBridge;

        public GameHub(SignalRBridgeActorProvider signalRBridge)
        {
            _signalRBridge = signalRBridge();
        }
        public void JoinGame(string playerName)
        {
            _signalRBridge.Tell(new JoinGameMessage(playerName));
        }
    }
}

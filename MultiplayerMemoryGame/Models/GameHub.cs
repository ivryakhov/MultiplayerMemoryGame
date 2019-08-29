using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace MultiplayerMemoryGame.Models
{
    public class GameHub : Hub
    {
      //  private readonly ISignalRBridgeActorInstance _signalRBridge;

        //public GameHub(ISignalRBridgeActorInstance signalRBridge)
        //{
        //    _signalRBridge = signalRBridge;
        //}
        public void JoinGame(string playerName)
        {
            //_signalRBridge.Tell(new JoinGameMessage(playerName));
            Console.WriteLine("echo");
        }

        public async Task NewMessage(long username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}

using ActorModel.Actors.ActorInstances;
using ActorModel.Messages;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MultiplayerMemoryGame.Models
{
    public class GameHub : Hub
    {
        private readonly ISignalRBridgeActorInstance _signalRBridge;

        public GameHub(ISignalRBridgeActorInstance signalRBridge)
        {
            _signalRBridge = signalRBridge;
        }
        public void JoinGame(string playerName)
        {
            _signalRBridge.Tell(new JoinGameMessage(playerName, Context.ConnectionId));            
        }

        public void LeaveGame(string playerName)
        {
            _signalRBridge.Tell(new LeaveGameMessage(playerName, Context.ConnectionId));
        }

        public void ReturnToGame(string playerName)
        {
            _signalRBridge.Tell(new ReturnToGameMessage(playerName, Context.ConnectionId));
        }

        public void RequestPLayersList()
        {
            _signalRBridge.Tell(new RequestPlayersListMessage(Context.ConnectionId));
        }

        public void ProcessCardClick(int index, string name)
        {
            _signalRBridge.Tell(new ProcessCardClickMessage(index, name));
        }

        public override Task OnConnectedAsync()
        {
            _signalRBridge.Tell(new RequestPlayersListMessage(Context.ConnectionId));
            _signalRBridge.Tell(new RequestBoardStateMessage(Context.ConnectionId));
            return base.OnConnectedAsync();
        }
    }
}

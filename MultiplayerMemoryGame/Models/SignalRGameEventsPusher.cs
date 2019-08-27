using ActorModel.ExternalSystems;
using Microsoft.AspNetCore.SignalR;

namespace MultiplayerMemoryGame.Models
{
    public class SignalRGameEventsPusher : IGameEventsPusher
    {
        private readonly IHubContext<GameHub> _gameHubContext;

        public SignalRGameEventsPusher(IHubContext<GameHub> gameHubContext)
        {
            _gameHubContext = gameHubContext;
        }

        public void PlayerJoined(string playerName)
        {
            _gameHubContext.Clients.All.SendAsync("playerJoined", playerName);
        }
    }
}

using System.Collections.Generic;

namespace ActorModel.ExternalSystems
{
    public interface IGameEventsPusher
    {
        void PlayerJoined(string playerName);
        void PlayersListProvided(IList<string> playersList, string connectionId);
        void PlayerLoginSuccess(string playerName, string connectionId);
    }
}

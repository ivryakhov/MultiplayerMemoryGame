using System.Collections.Generic;
using GameModel;

namespace ActorModel.ExternalSystems
{
    public interface IGameEventsPusher
    {
        void PlayerJoined(string playerName);
        void PlayersListProvided(IList<string> playersList, string connectionId);
        void PlayerLoginSuccess(string playerName, string connectionId);
        void PlayerLoginFailed(string errorMessage, string connectionId);
        void BoardStateProvided(Board board, string connectionId);
    }
}

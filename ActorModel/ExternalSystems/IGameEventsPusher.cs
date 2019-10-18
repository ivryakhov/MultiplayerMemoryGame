using System.Collections.Generic;
using GameModel;

namespace ActorModel.ExternalSystems
{
    public interface IGameEventsPusher
    {
        void PlayerJoined(Player player);
        void PlayersListProvided(IList<Player> playersList, string connectionId);
        void PlayerLoginSuccess(string playerName, string connectionId);
        void PlayerLoginFailed(string errorMessage, string connectionId);
        void BoardStateProvided(Board board, string connectionId);
        void BroadcastBoardState(Board board);
        void PlayerLogoutSuccess(string playerName, string connectionId);
        void PlayerLeaved(string playerName);
        void LogMessage(string message);
    }
}

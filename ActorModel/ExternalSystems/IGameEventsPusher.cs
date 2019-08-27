namespace ActorModel.ExternalSystems
{
    public interface IGameEventsPusher
    {
        void PlayerJoined(string playerName);
    }
}

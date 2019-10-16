namespace ActorModel.Messages
{
    public class PlayerLoginSuccess
    {
        public string PlayerName { get; private set; }
        public string ConnectionId { get; private set; }

        public PlayerLoginSuccess(string playerName, string connectionId)
        {
            PlayerName = playerName;
            ConnectionId = connectionId;
        }
    }
}

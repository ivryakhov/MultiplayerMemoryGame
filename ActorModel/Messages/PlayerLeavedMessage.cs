namespace ActorModel.Messages
{
    public class PlayerLeavedMessage
    {
        public string PlayerName { get; private set; }

        public PlayerLeavedMessage(string playerName)
        {
            PlayerName = playerName;
        }
    }
}

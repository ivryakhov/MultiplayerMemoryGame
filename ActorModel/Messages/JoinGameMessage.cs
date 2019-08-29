namespace ActorModel.Messages
{
    public class JoinGameMessage : IActorMessage
    {
        public string PlayerName { get; private set; }
        public JoinGameMessage(string playerName)
        {
            PlayerName = playerName;
        }
    }
}

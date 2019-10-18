namespace ActorModel.Messages
{
    public class ProcessCardClickMessage : IActorMessage
    {
        public int Index { get; private set; }
        public string PlayerName { get; private set; }

        public ProcessCardClickMessage(int index, string playerName)
        {
            Index = index;
            PlayerName = playerName;
        }
    }
}

namespace ActorModel.Messages
{
    public class ProcessCardClickMessage : IActorMessage
    {
        public int Index { get; private set; }

        public ProcessCardClickMessage(int index)
        {
            Index = index;
        }
    }
}

namespace GameModel
{
    public class Player
    {
        public string Name { get; private set; }
        public int Score { get; set; }
        public bool IsActive { get; set; }

        public Player(string name)
        {
            Name = name;
            Score = 0;
            IsActive = true;
        }
    }
}

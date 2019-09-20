using System;
using System.Collections.Generic;
using System.Linq;

namespace GameModel
{
    public class Board
    {
        private readonly IEnumerable<string> _cardValues = new List<string>()
        {
            "fa-anchor", "fa-ambulance", "fa-beer", "fa-balance-scale", "fa-bath",
            "fa-basketball-ball", "fa-bicycle", "fa-bone", "fa-bug", "fa-bus",
            "fa-crown", "fa-crow", "fa-chess-knight", "fa-couch", "fa-coffee",
            "fa-bomb", "fa-car", "fa-camera", "fa-glasses", "fa-guitar",
            "fa-dice", "fa-dove", "fa-drum", "fa-heart", "fa-helicopter",
            "fa-eye", "fa-feather", "fa-fighter-jet", "fa-fire"
        };

        public IEnumerable<Card> Cards { get; private set; }

        public Board()
        {
            Cards = prepareCards();
        }

        private IEnumerable<Card> prepareCards()
        {
            Random r = new Random();
            var uniqueNamesSet = _cardValues.OrderBy(i => r.Next()).Take(15).ToList();
            var duplicatedNamesSet = uniqueNamesSet.Concat(uniqueNamesSet);
            var shuffledNamesSet = duplicatedNamesSet.OrderBy(i => r.Next()).ToList();

            return shuffledNamesSet.Select(cardValue => new Card(cardValue)).ToList();
        }
    }
}

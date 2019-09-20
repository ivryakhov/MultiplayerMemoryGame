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

        private readonly Card _nullCard = new Card("", 0);
        private Card _openedCard;

        public IEnumerable<Card> Cards { get; private set; }
        public int[] IdexesToPostoponeClosing { get; private set; }

        public Board()
        {
            Cards = prepareCards();
            IdexesToPostoponeClosing = new int[0];
            _openedCard = _nullCard;
        }

        public void ProcessCardClick(int index)
        {
            var clickedCard = Cards.First(c => c.Index == index);
            if (_openedCard.Index == 0)
            {
                _openedCard = clickedCard;
                Cards = Cards.Select(c => openRequiredCard(c, index)).ToList();
                IdexesToPostoponeClosing = new int[0];
            }
            else
            {
                if (clickedCard.FrontValue == _openedCard.FrontValue)
                {
                    Cards = Cards.Select(c => matchRequiredCard(c, clickedCard.FrontValue)).ToList();
                    IdexesToPostoponeClosing = new int[0];
                }
                else
                {
                    Cards = Cards.Select(c => closeRequiredCards(c, _openedCard.Index, clickedCard.Index)).ToList();
                    IdexesToPostoponeClosing = new int[2] { _openedCard.Index, clickedCard.Index };
                }
                _openedCard = _nullCard;
            }
        }

        private IEnumerable<Card> prepareCards()
        {
            Random r = new Random();
            var uniqueNamesSet = _cardValues.OrderBy(i => r.Next()).Take(15).ToList();
            var duplicatedNamesSet = uniqueNamesSet.Concat(uniqueNamesSet);
            var shuffledNamesSet = duplicatedNamesSet.OrderBy(i => r.Next()).ToList();
            var index = 1;
            return shuffledNamesSet.Select(cardValue => new Card(cardValue, index++)).ToList();
        }

        private Card openRequiredCard(Card card, int index)
        {
            if (card.Index == index)
            {
                card.IsClosed = false;
                card.IsDisabled = true;
            }
            return card;
        }

        private Card matchRequiredCard(Card card, string frontValue)
        {
            if (card.FrontValue == frontValue)
            {
                card.IsClosed = false;
                card.IsDisabled = true;
                card.IsMatched = true;
            }
            return card;
        }

        private Card closeRequiredCards(Card card, int index1, int index2)
        {
            if (card.Index == index1 || card.Index == index2 )
            {
                card.IsClosed = true;
                card.IsDisabled = false;
                card.IsMatched = false;
            }
            return card;
        }
    }
}

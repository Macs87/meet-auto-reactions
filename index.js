function meetAutoReactions() {
  function getElement(xpath) {
    return document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue;
  }
  function getEmojiButton(index) {
    const emojis = ['💖', '👍', '🎉', '👏', '😂', '😮', '😢', '🤔', '👎'];
    return getElement(`//button/img[@data-emoji="${emojis[index]}"]`);
  }

  const sendReactionButton = getElement('//i[text()="mood"]');
  
  const intervalIds = [];

  return ({
    startReacting(index, timeout = 1000) {
      if (!getEmojiButton(index)) sendReactionButton.click();
      intervalIds.push(setInterval(() => {
        try {
          getEmojiButton(index).click();
        } catch {
          this.stopReacting();
        }
      }, timeout));
    },
    stopReacting() {
      intervalIds.forEach(id => clearInterval(id));
      intervalIds.length = 0;
    }
  });
}

const meet = meetAutoReactions();

meet.startReacting(0);

// Ну, выглядит весьма компактно, получше чем у меня!  Спасибо! Я понял.
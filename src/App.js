import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


class App extends React.Component {

  onLetterSelected(letter) {
    if (this.currentLetter >= this.wordLength) return;

    this.state.guesses[this.currentGuess][this.currentLetter++].letter = letter;
    this.setState({
      guesses: this.state.guesses
    })
  }

  onClear() {
    for (var i =0; i < this.wordLength;i++) {
      this.state.guesses[this.currentGuess][i].letter = ''
    }

    this.setState({ guesses: this.state.guesses });
    this.currentLetter = 0;
  }
  
  onSubmit() {
    if (this.currentLetter < this.wordLength) return;

    for (var i = 0; i < this.wordLength; i++) {
      if (this.state.guesses[this.currentGuess][i].letter == this.word[i]) {
        this.state.guesses[this.currentGuess][i].state = 'GREEN'
      } else if (this.word.includes(this.state.guesses[this.currentGuess][i].letter)) {
        this.state.guesses[this.currentGuess][i].state = 'YELLOW'
      } else {
        this.state.guesses[this.currentGuess][i].state = 'BLACK'
      }
    }

    this.setState({ guesses: this.state.guesses });

    this.currentGuess++;
    this.currentLetter = 0;
  }

  onReshow() {
    for (var i = 0; i < this.wordLength; i++) {
      this.onLetterSelected('')
    }

    this.onSubmit();
    this.showWord();
  }

  showWord() {
    setTimeout(() => {
      this.setState({ displayWord: true})
      setTimeout(() => {
        this.setState({ displayWord: false})
      }, this.showTime)
    }, this.introTime)
  }

  wordLength = 5;
  maxGuesses = 5;
  word = [];
  currentGuess = 0;
  currentLetter = 0;
  introTime = 2000;
  showTime = 3000;
  set = shuffle(['𓏰', '𓏱', '𓏲', '𓏳', '𓏴', '𓏵', '𓏶', '𓏷', '𓏸', '𓏹', '𓏺', '𓏻', '𓏼', '𓏾', '𓏿', '𓐠', '𓐡', '𓐢', '𓐣', '𓐤', '𓐥', '𓐦', '𓐧', '𓐨', '𓐩', '𓐪' ]);
  state = {
    guesses: [],
    displayWord: false
  };


  constructor(props) {
    super(props);
    for (var i = 0; i < this.wordLength; i++) {
      var randomIndex = randomIntFromInterval(0, this.set.length - 1);
      this.word[i] = this.set[randomIndex];
    }

    for (var i = 0; i < this.maxGuesses; i++) {
      var guess = [];
      for (var j = 0; j < this.wordLength; j++) {
        guess.push({ letter: '', state: null })
      }

      this.state.guesses.push(guess);
    }
  }

  componentDidMount() {
    this.showWord();
  }

  render() {
    return (
      <div className="App" >
        <br />

        <div className='row'>
          {this.word.map(l => <div className='box'>{this.state.displayWord ? l : ''}</div>)}
        </div>

        <br />

        {this.state.guesses.map(guess =>
          <div className='row'>
            {guess.map(letter => {
              var className = `box ${letter.state}`;
              return <div className={className}>{letter.letter}</div>
            })}
          </div>
        )}

        <br />

        <div className='row'>
          {this.set.map(l => <button onClick={() => this.onLetterSelected(l)} className='box'>{l}</button>)}
        </div>

        <br />

        <div className='buttons'>
          <button onClick={() => this.onClear()}>Clear</button>
          <button onClick={() => this.onReshow()}>Show</button>
          <button onClick={() => this.onSubmit()}>Submit</button>
        </div>
      </div >
    );
  }
}

export default App;

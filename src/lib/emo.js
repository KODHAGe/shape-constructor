let emotionsOrder = [
  'anger',
  'fear',
  'joy',
  'sadness',
  'analytical',
  'confident',
  'tentative',
  'negative',
  'positive'
]


export function emotionArray(data) {
  let output = [0,0,0,0,0,0,0,0,0]

  let emotions = data.detectedEmotions
  for (let i = 0; i < emotions.length; i++) {
    let index = emotionsOrder.indexOf(emotions[i].tone_id)
    output[index] = emotions[i].score
  }
  return output
}
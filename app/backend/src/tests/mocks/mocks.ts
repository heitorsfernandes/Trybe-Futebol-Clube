const mockPostMatchResult =
[
  {
    "id": 49,
    "homeTeamId": 8,
    "awayTeamId": 12,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  }
]
const mockSendPostBody = {
  "homeTeamId": 8,
  "awayTeamId": 12,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const mockSendPostBodyEqual = {
  "homeTeamId": 12,
  "awayTeamId": 12,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}
export { mockPostMatchResult, mockSendPostBody, mockSendPostBodyEqual }
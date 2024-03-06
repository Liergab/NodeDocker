import { getDiscordUserById } from "../controller/discordUserController.js"

const mockRequest = {
    params:{id:"65e6fd73290657d36eb70465"}
}
const mockJson = jest.fn(); 
const mockStatus = jest.fn(() => ({ json: mockJson })); 
const mockRes = { 
    status: mockStatus,
    json: mockJson 
};
describe('get discord user', () => {
    test('should get discord user by id', () => {
        getDiscordUserById(mockRequest, mockRes)
    })
})


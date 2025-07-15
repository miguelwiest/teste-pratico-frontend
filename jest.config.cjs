module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(svg|ttf|woff|woff2|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
    },
};
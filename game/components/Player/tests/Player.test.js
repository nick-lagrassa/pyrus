import Player from '../index';

test('Player', () => {
    const player = new Player('Ronald');
    expect(player.name).toEqual('Ronald');
    expect(player.hand).toHaveLength(0);
});

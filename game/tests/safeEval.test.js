import safeEval from '../util/safeEval';

test('safeEval runs correctly', () => {
    expect(safeEval('(function () { return 2; })()')).toBe(2);
    // for some reason .toBeInstanceOf(SyntaxError) doesn't work here
    expect(safeEval('(function ( { while (true) {} })()').constructor.name).toBe('SyntaxError');

    const timeoutResult = safeEval('(function () { while (true) {} })()')
    expect(timeoutResult.constructor.name).toBe('Error');
    expect(timeoutResult.message).toContain('Timeout');
});

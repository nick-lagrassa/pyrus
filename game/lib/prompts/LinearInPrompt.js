import Prompt from '../../components/Prompt';
import cards from '../cards';

class LinearInPrompt extends Prompt {
    constructor() {
        super();
        this.name = 'Linear In';
        this.signature = 'function linearIn(inner, outer)';
        this.constructor = 'LinearInPrompt';

        this.cardSet = [
            new cards.HashTableCard,
            new cards.HashTableCard,
            new cards.WhileCard,
            new cards.FunctionCard,
            new cards.StackCard,
            new cards.DoWhileCard,
            new cards.ConditionalCard,
            new cards.ConditionalCard,
            new cards.ConditionalCard,
            new cards.ObjectCard,
            new cards.ObjectCard,
            new cards.ArrayCard,
            new cards.ArrayCard,
            new cards.ForCard,
            new cards.SwitchCard
        ];

        this.info = {
            title: 'Linear In',
            description: 'Given two sorted arrays of integers, outer and inner, return true if all the numbers in inner appear in outer. The best solution makes only a single "linear" pass of both arrays, taking advantage of the fact that they are sorted',
            examples: 'Given inner = [3,5], outer = [2,3,4,5]\nReturn true' ,
        };

        this.exampleTests = [
            {
                input: [[3,5],[2,3,4,5]],
                expected: true
            }
        ];

        this.tests = [
            {
                input: [[33,45,47,50],[33,45,46,47,58]],
                expected: false
            }, {
                input: [[14,18],[14,18]],
                expected: true
            }, {
                input: [[3,5],[2,3,4]],
                expected: false
            }, {
                input: [[-3,8,9,11],[-3,2,3,4,5,8,9,10,11,12]],
                expected: true
            }, {
                input: [[3,4,4,4,4],[2,3,4,4,4,5,6,7]],
                expected: false
            }, {
                input: [[],[-10,10]],
                expected: true
            }
        ];

        this.hiddenTests = [
            {
                input: [[],[]],
                expected: true
            }, {
                input: [[1],[]],
                expected: false
            }
        ];

        this.exampleTestResults = [];
        this.testResults = [];
    }
}

export default LinearInPrompt;

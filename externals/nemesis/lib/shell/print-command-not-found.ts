import {
    org,
    use16,
    nemesis,
} from '@ishvara/operator-fasm';

let commandNotFoundFirst = [`Command: '`];

let commandNotFoundSecond = [
    `' not found. Type 'help' to get list of supported commands`,
    0xd,
    0,
];

export async function printCommandNotFound(command) {
    nemesis.setColor({
        color: 'red',
    });
    
    nemesis.printf(commandNotFoundFirst);
    nemesis.printf(command);
    nemesis.printf(commandNotFoundSecond);
    
    nemesis.setColor();
}

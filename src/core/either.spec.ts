import { Either, left, right } from './either';

function doSomeThing(shouldSucess: boolean): Either<string, number> {
    if (shouldSucess) {
        return right(10);
    } else {
        return left('error');    
    } 
}

test('sucess result', () => {
    const result = doSomeThing(true);
    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
})

test('error result', () => {
    const result = doSomeThing(false);
    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
})
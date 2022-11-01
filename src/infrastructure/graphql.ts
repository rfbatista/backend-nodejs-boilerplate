import { Result } from '@shared/Result';
import Session from './session';

export type GraphqlResolver<T, U, V> = (parent: T, args: U, context: Session) => Promise<Result<V> | Result<Error>>

declare module 'morph-expressions' {
	export default class Parser {
		registerFunction(name: string, handler: Function): void;
		parse(source: string): { eval(variables: Record<string, any>): number }
	}
}

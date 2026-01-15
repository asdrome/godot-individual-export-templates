// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

	}

	interface Release {
		tag_name: string;
		assets?: Asset[];
	}


	// This two definitions will be merged into one
	// As received from GitHub API
	interface Asset {
		name: string;
		browser_download_url: string;
		id: number;
	}

	// To choose which assets the user wants to download
	interface Asset {
		selected?: boolean;
	}


	interface Platform {
		label: string;
		matchers: RegExp[];
	}

	interface PlatformAssets {
		label: Platform.label;
		assets: Asset[];
	}
}
export { };

import Link from '@tiptap/extension-link';

export const CustomLink = Link.extend({
	addKeyboardShortcuts() {
		return {
			'Meta-k': () => {
				const href = prompt('href');
				return this.editor.commands.setLink({ href });
			}
		};
	}
});

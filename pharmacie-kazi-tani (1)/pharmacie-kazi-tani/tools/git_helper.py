import os
import subprocess

def get_all_project_files():
    file_list = []
    # Explicitly walk directories
    for top in ['src', 'docs', 'tools', 'tests', 'supabase']:
        if os.path.exists(top):
            for root, dirs, files in os.walk(top):
                dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.cache', '.npm']]
                for f in files:
                    file_list.append(os.path.join(root, f))
    # Root files
    for rf in ['index.html', 'package.json', 'tsconfig.json', 'vite.config.ts', 'tailwind.config.ts']:
        if os.path.exists(rf):
            file_list.append(rf)
    return file_list

def add_and_commit(message, paths=None):
    if paths is None:
        paths = get_all_project_files()

    for p in paths:
        if os.path.exists(p) and not os.path.isdir(p):
            p_rel = os.path.relpath(p, '.')
            try:
                h = subprocess.check_output(['git', 'hash-object', '-w', p_rel]).decode().strip()
                subprocess.check_call(['git', 'update-index', '--add', '--cacheinfo', '100644', h, p_rel])
            except Exception as e:
                print(f"Error adding {p_rel}: {e}")

    try:
        subprocess.check_call(['git', 'commit', '-m', message])
        print(f"Committed: {message}")
    except subprocess.CalledProcessError as e:
        print("Nothing changed to commit or error:", e)

if __name__ == '__main__':
    import sys
    msg = sys.argv[1] if len(sys.argv) > 1 else "chore: update"
    files = sys.argv[2:] if len(sys.argv) > 2 else None
    add_and_commit(msg, files)

FRONTEND_FILES := $(shell find frontend \( -path frontend/node_modules -o -path frontend/out -o -path frontend/.next \) -prune -o -print)
BACKEND_FILES := $(shell find src/)

frontend/out: $(FRONTEND_FILES)
	cargo clean -p backend
	(cd frontend; npm run build)
	(cd frontend; npm run export)

target/debug/backend: frontend/out $(BACKEND_FILES)
	cargo build

target/release/backend: frontend/out $(BACKEND_FILES)
	cargo build --release

target/x86_64-unknown-linux-musl/release/backend: frontend/out $(BACKEND_FILES)
	cargo build --target x86_64-unknown-linux-musl --release


publish: target/x86_64-unknown-linux-musl/release/backend
	scp target/x86_64-unknown-linux-musl/release/backend root@souvik.me:/etc/nixos

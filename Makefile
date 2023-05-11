define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef

PROJECT      := $(call GetFromPkg,name)
LAST_VERSION := $(call GetFromPkg,version)


.PHONY: test
test:
	@echo ${PROJECT}
	@echo v${LAST_VERSION}

.PHONY: up
up:
	git add .
	git commit -am "update"
	git pull 
	git push 
	@echo "\n 代码提交..."

.PHONY: tag
tag:
	git pull 
	git add .
	git commit -am "${PROJECT} ${LAST_VERSION}"
	git push 
	git tag v${LAST_VERSION}
	git push --tags
	@echo "\n tags 发布中..."


.PHONY: tag2
tag2:
	git push 
	git tag v${LAST_VERSION}
	git push --tags
	@echo "\n tags 发布中..."
from huggingface_hub import snapshot_download
model_path = snapshot_download(repo_id="microsoft/phi-3-mini-4k-instruct",
    local_dir="D:\Phi3", 
    local_dir_use_symlinks=False)
print(f"模型已下载到：{model_path}")
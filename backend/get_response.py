import os
import torch
from transformers import pipeline, AutoConfig, BitsAndBytesConfig, AutoModelForCausalLM, AutoTokenizer
from flask import Flask, request, jsonify, session
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from flask_session import Session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'  # Store sessions on the file system
Session(app)

def initialize_llm(llm_model_path, max_new_tokens=768, max_length=4096):
    # device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    quantization_config = BitsAndBytesConfig(
        llm_int8_enable_fp32_cpu_offload=True,
        bnb_4bit_quant_type='nf4',
        bnb_4bit_use_double_quant=True,
        bnb_4bit_compute_dtype=torch.bfloat16,
        load_in_4bit=True
    )
    model = AutoModelForCausalLM.from_pretrained(
        llm_model_path,
        quantization_config=quantization_config,
        trust_remote_code=True
    )
    tokenizer = AutoTokenizer.from_pretrained(llm_model_path, trust_remote_code=True)

    text_generation_pipeline = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=max_new_tokens,
        device_map="cpu"
    )

    return text_generation_pipeline

def create_prompt_template(web_json,question,history,history_str):
    prompt_template = f"""
    You are an intelligent assistant. Below is a list of webpages in JSON format, where each entry includes a 'name' and a 'url'. Based on the given command, identify the most appropriate webpage to open and provide its URL.
    Conversation History:
    {history_str}

    Webpages JSON:
    {web_json}

    Command: {question}

    Response: Only provide the URL of the webpage that best matches the command. Give us the page we need to navigate.
    """
    return prompt_template

llm_model_path = "D:\Phi3"
llm_pipeline = initialize_llm(llm_model_path)
memory = ConversationBufferMemory()

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    if not data or 'question' not in data:
        return jsonify({'error': 'loss some label'}), 400

    question = data['question']
    web_json = data['web_json']
    chat_history = session.get('chat_history', [])

    # Update memory with the current chat history
    for entry in chat_history:
        memory.chat_memory.add_user_message(entry['user'])
        memory.chat_memory.add_ai_message(entry['assistant'])
    # history = session.get('chat_history', [])
    # history_str = "\n".join([f"User: {msg['user']}\nAssistant: {msg['assistant']}" for msg in chat_history])
    history_str = memory.load_memory_variables({})['history']
    prompt = create_prompt_template(web_json,question,history_str)

    response = llm_pipeline(prompt)[0]['generated_text']

    answer = response.split("Response: Only provide the URL of the webpage that best matches the command.")[-1].strip()
    memory.chat_memory.add_user_message(question)
    memory.chat_memory.add_ai_message(answer)
    session['chat_history'] = memory.load_memory_variables({})['history']
    # chat_history.append({'user': question, 'assistant': answer})
    # session['chat_history'] = chat_history
    return jsonify({'answer': answer})

if __name__ == "__main__":
    app.run(debug=False, port=2024, host='0.0.0.0')

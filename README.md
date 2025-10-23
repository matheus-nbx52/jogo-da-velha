# 🎮 Jogo da Velha

Um projeto simples de **Jogo da Velha** desenvolvido em **JavaScript** para ser executado no ambiente **Node.js**, utilizando o módulo `readline-sync` para interação com o usuário via terminal. Este trabalho faz parte do nosso aprendizado na formação de Fullstack da Rede Cidadã/Start.



---

## ✨ Funcionalidades

O jogo oferece diversas opções de jogabilidade para desafiar o usuário:

* **Modos de Jogo:**
    * **Player vs Player (PVP):** Dois jogadores humanos se revezam no tabuleiro.
    * **Player vs Máquina (PVE):** Desafie a inteligência artificial.
* **Níveis de Dificuldade da Máquina (IA):**
    * **Fácil (`facil`):** A máquina faz movimentos aleatórios.
    * **Média (`media`):** A máquina verifica se pode vencer ou se precisa bloquear o jogador.
    * **Difícil (`dificil`):** Além das verificações de vitória/bloqueio, a máquina prioriza o centro (posição 5) e os cantos para uma estratégia mais robusta.
* **Jogabilidade em Loop:** Opção para jogar novamente ao final de cada partida.

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** JavaScript (ES6+)
* **Ambiente de Execução:** Node.js
* **Dependência:** `readline-sync` para capturar a entrada do usuário de forma síncrona.

---

## ⚙️ Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

### 1. Clonar o Repositório
bash
git clone https://github.com/matheus-nbx52/jogo-da-velha.git.

### 2. Executando o Projeto

cd src

node velha.js


import os, sys
sys.stderr = open(os.devnull, 'w')
import pytest
import time
from selenium import webdriver
from subprocess import CREATE_NO_WINDOW
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

URL = "http://localhost:5173/register"
chrome_opts = Options()
devnull = 'NUL' if os.name == 'nt' else '/dev/null'
service = Service(
    ChromeDriverManager().install(),
    log_path=devnull,
    creationflags=CREATE_NO_WINDOW  
)

opts = webdriver.ChromeOptions()
opts.add_experimental_option("excludeSwitches", ["enable-logging"])
opts.add_argument("--log-level=3")
opts.set_capability("goog:loggingPrefs", {"performance": "OFF", "browser": "SEVERE"})
SEL = {
    "nome": "nome",
    "telefone": "telefone",
    "cpf": "cpf",
    "email": "email",
    "confirmar_email": "confirmar_email",
    "senha": "senha",
    "confirmar_senha": "confirmar_senha",
    "botao_criar": "botao_criar"
}

def get_helper_text(driver, field_id):
    els = driver.find_elements(By.ID, f"{field_id}-helper-text")
    if els:
        txt = els[0].text.strip()
        return txt if txt else None
    return None

def preencher(driver, tel, cpf, email, cemail, pwd, cpwd):
    errors = {}

    nome_el = driver.find_element(By.ID, SEL["nome"])
    nome_el.clear()
    nome_el.send_keys("nome teste")
    nome_el.send_keys(Keys.TAB)
    time.sleep(0.1)
    errors["nome"] = get_helper_text(driver, SEL["nome"])

    for field, value in [
        ("telefone", tel),
        ("cpf", cpf),
        ("email", email),
        ("confirmar_email", cemail),
        ("senha", pwd),
        ("confirmar_senha", cpwd),
    ]:
        inp = driver.find_element(By.ID, SEL[field])
        inp.clear()
        inp.send_keys(value)
        inp.send_keys(Keys.TAB)
        time.sleep(0.1)
        errors[field] = get_helper_text(driver, SEL[field])

    return errors

@pytest.fixture(scope="function")
def driver():
    drv = webdriver.Chrome(service=service, options=opts)
    drv.get(URL)
    yield drv
    drv.quit()

def test_senha_minima_valida(driver):
    errs = preencher(driver,
        "(11) 91234-5678", "123.456.789-09",
        "a@a.com", "a@a.com",
        "12345678", "12345678"
    )
    assert errs["senha"] is None, f"Erro inesperado de senha: {errs['senha']}"
    assert errs["confirmar_senha"] is None, f"Erro inesperado de confirmação: {errs['confirmar_senha']}"

def test_senha_minima_invalida(driver):
    errs = preencher(driver,
        "(11) 91234-5678", "123.456.789-09",
        "a@a.com", "a@a.com",
        "1234567", "1234567"
    )
    assert errs["senha"] == "Mínimo 8 caracteres", f"Esperava erro de tamanho mas veio: {errs['senha']}"

@pytest.mark.parametrize("telefone, esperado", [
    ("(11) 91234-5678", None),
    ("(11) 1234-5678", "Telefone inválido"),
])
def test_telefone_validador(driver, telefone, esperado):
    errs = preencher(driver,
        telefone, "123.456.789-09",
        "a@a.com", "a@a.com",
        "12345678", "12345678"
    )
    assert errs["telefone"] == esperado, f"Telefone {telefone}: esperado {esperado}, mas veio {errs['telefone']}"

@pytest.mark.parametrize("cpf, esperado", [
    ("123.456.789-09", None),
    ("123.456.789-00", "CPF inválido"),
])
def test_cpf_validador(driver, cpf, esperado):
    errs = preencher(driver,
        "(11) 91234-5678", cpf,
        "a@a.com", "a@a.com",
        "12345678", "12345678"
    )
    assert errs["cpf"] == esperado, f"CPF {cpf}: esperado {esperado}, mas veio {errs['cpf']}"

@pytest.mark.parametrize("email, esperado", [
    ("teste@exemplo.com", None),
    ("teste@exemplo@com", "Formato de e-mail inválido"),
])
def test_email_validador(driver, email, esperado):
    errs = preencher(driver,
        "(11) 91234-5678", "123.456.789-09",
        email, email,
        "12345678", "12345678"
    )
    assert errs["email"] == esperado, f"Email {email}: esperado {esperado}, mas veio {errs['email']}"

def test_double_check_invalido(driver):
    errs = preencher(driver,
        "(11) 91234-5678", "123.456.789-09",
        "a@a.com", "a@a.com",
        "Senha123", "Senha456"
    )
    assert errs["confirmar_senha"] == "Senhas não coincidem", (
        f"Esperava 'Senhas não coincidem' mas veio: {errs['confirmar_senha']}"
    )

def test_create_sucesso(driver):
    errs = preencher(driver,
        "(75) 55544-4444", "210.830.180-19",
        "teste@teste.com.br", "teste@teste.com.br",
        "12345678", "12345678"
    )
    for f, e in errs.items():
        assert e is None, f"Erro no campo {f}: {e}"

    driver.find_element(By.ID, SEL["botao_criar"]).click()
    time.sleep(0.5)
    alert = driver.find_element(By.ID, "alert_success")
    assert alert.text == "Conta criada com sucesso!", (
        f"Esperava alerta de sucesso mas veio: {alert.text}"
    )

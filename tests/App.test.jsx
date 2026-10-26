import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App.jsx';

async function fillForm(user) {
  await user.type(screen.getByLabelText('Nome do contato'), 'Ana Silva');
  await user.type(screen.getByLabelText('Empresa'), 'Indústria Exemplo');
  await user.selectOptions(screen.getByLabelText('Serviço desejado'), 'Ultrassom (UT)');
  await user.type(screen.getByLabelText('Local da execução'), 'Santos / SP');
  await user.type(screen.getByLabelText('Descrição do serviço'), 'Inspeção de tanque');
}

afterEach(() => vi.restoreAllMocks());

describe('Site da Wins', () => {
  it('mostra as seções, links e o ano atual', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A confiança começa pela inspeção.');
    expect(screen.getByRole('heading', { name: /Ensaio por\s*ultrassom/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Líquido\s*penetrante/i })).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(within(nav).getByRole('link', { name: 'Serviços' })).toHaveAttribute('href', '#servicos');
    expect(document.querySelector('#year')).toHaveTextContent(String(new Date().getFullYear()));
  });

  it('exige os campos obrigatórios antes de preparar a solicitação', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Preparar solicitação/i }));
    expect(screen.getByLabelText('Nome do contato')).toBeInvalid();
    expect(screen.getByLabelText('Serviço desejado')).toBeInvalid();
    expect(screen.queryByRole('button', { name: 'Copiar solicitação' })).not.toBeInTheDocument();
  });

  it('prepara uma mensagem com os dados e o prazo padrão', async () => {
    const user = userEvent.setup();
    render(<App />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /Preparar solicitação/i }));
    const result = screen.getByLabelText('Solicitação preparada');
    expect(result.value).toContain('Olá! Gostaria de solicitar um orçamento à Wins Inspeções.');
    expect(result.value).toContain('Nome: Ana Silva');
    expect(result.value).toContain('Serviço: Ultrassom (UT)');
    expect(result.value).toContain('Prazo: A combinar');
    expect(result.value).toContain('Descrição: Inspeção de tanque');
  });

  it('copia a solicitação e informa o resultado', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    render(<App />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /Preparar solicitação/i }));
    await user.click(screen.getByRole('button', { name: 'Copiar solicitação' }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Nome: Ana Silva'));
    expect(screen.getByRole('status')).toHaveTextContent('Solicitação copiada');
  });

  it('permite copiar manualmente quando a área de transferência falha', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('indisponível'));
    render(<App />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /Preparar solicitação/i }));
    await user.click(screen.getByRole('button', { name: 'Copiar solicitação' }));
    expect(screen.getByRole('status')).toHaveTextContent('Selecione e copie o texto acima manualmente.');
    expect(screen.getByLabelText('Solicitação preparada')).toHaveFocus();
  });
});

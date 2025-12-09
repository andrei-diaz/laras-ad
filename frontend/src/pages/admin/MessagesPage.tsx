import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import contactMessageService, { ContactMessage } from '../../services/contactMessageService';
import { Mail, MailOpen, Trash2, Phone, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const MessagesPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [selectedMessage, setSelectedMessage] = React.useState<ContactMessage | null>(null);

    const { data: messages = [], isLoading } = useQuery({
        queryKey: ['admin-messages'],
        queryFn: contactMessageService.getAllMessages,
    });

    const { data: unreadCount = 0 } = useQuery({
        queryKey: ['unread-count'],
        queryFn: contactMessageService.getUnreadCount,
    });

    const markReadMutation = useMutation({
        mutationFn: contactMessageService.markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
            queryClient.invalidateQueries({ queryKey: ['unread-count'] });
        },
    });

    const markUnreadMutation = useMutation({
        mutationFn: contactMessageService.markAsUnread,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
            queryClient.invalidateQueries({ queryKey: ['unread-count'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: contactMessageService.deleteMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
            queryClient.invalidateQueries({ queryKey: ['unread-count'] });
            setSelectedMessage(null);
        },
    });

    const handleSelectMessage = (message: ContactMessage) => {
        setSelectedMessage(message);
        if (!message.isRead) {
            markReadMutation.mutate(message.id);
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Eliminar este mensaje?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Mensajes de Contacto</h1>
                <p className="text-muted-foreground">
                    {unreadCount > 0 ? `${unreadCount} mensajes sin leer` : 'No hay mensajes sin leer'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message List */}
                <div className="lg:col-span-1 bg-card rounded-lg border border-border">
                    <div className="p-4 border-b border-border">
                        <h2 className="font-semibold">Bandeja de Entrada</h2>
                    </div>
                    {isLoading ? (
                        <div className="p-4 text-center text-muted-foreground">Cargando...</div>
                    ) : messages.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">No hay mensajes</div>
                    ) : (
                        <div className="divide-y divide-border max-h-[60vh] overflow-y-auto">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    onClick={() => handleSelectMessage(msg)}
                                    className={`p-3 cursor-pointer hover:bg-muted transition-colors ${selectedMessage?.id === msg.id ? 'bg-muted' : ''
                                        } ${!msg.isRead ? 'bg-primary/5' : ''}`}
                                >
                                    <div className="flex items-start gap-2">
                                        {msg.isRead ? (
                                            <MailOpen className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                                        ) : (
                                            <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm truncate ${!msg.isRead ? 'font-semibold' : ''}`}>{msg.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {format(new Date(msg.createdAt), "d MMM, HH:mm", { locale: es })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-2 bg-card rounded-lg border border-border">
                    {selectedMessage ? (
                        <>
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold">{selectedMessage.name}</h2>
                                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if (selectedMessage.isRead) {
                                                markUnreadMutation.mutate(selectedMessage.id);
                                            } else {
                                                markReadMutation.mutate(selectedMessage.id);
                                            }
                                        }}
                                        className="p-2 hover:bg-muted rounded"
                                        title={selectedMessage.isRead ? 'Marcar como no leído' : 'Marcar como leído'}
                                    >
                                        {selectedMessage.isRead ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        className="p-2 hover:bg-muted rounded text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                    {selectedMessage.phone && (
                                        <span className="flex items-center gap-1">
                                            <Phone className="h-4 w-4" /> {selectedMessage.phone}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {format(new Date(selectedMessage.createdAt), "EEEE d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                                    </span>
                                </div>
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                                <div className="mt-4">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: Contacto desde LARAS`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Responder por email
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                            Selecciona un mensaje
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default MessagesPage;
